<?php

namespace Flagrow\Bazaar\Repositories;

use Flagrow\Bazaar\Extensions\ExtensionUtils;
use Flagrow\Bazaar\Search\FlagrowApi;
use Flagrow\Bazaar\Traits\Cachable;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Psr\Http\Message\ResponseInterface;

class ExtensionCacheRepository
{
    use Cachable;

    /**
     * @var Store
     */
    protected $store;

    /**
     * @var FlagrowApi
     */
    protected $api;

    const CACHE_KEY = 'flagrow.io.packages';
    const CACHE_EXPIRE = 60; // minutes

    public function __construct(Store $store, FlagrowApi $api)
    {
        $this->store = $store;
        $this->api = $api;
    }

    /**
     * Extracts the data from an API response
     * @param ResponseInterface $response
     * @return array
     */
    protected function unpackResponseData(ResponseInterface $response)
    {
        $json = json_decode($response->getBody()->getContents(), true);

        return Arr::get($json, 'data', []);
    }

    /**
     * (re)freshes extension data from the api
     * @return array
     */
    protected function allExtensionsFromApi()
    {
        $query = [
            'page[size]' => 9999,
            'page[number]' => 1, // Offset is zero-based, page number is 1-based
            'sort' => 'title' // Sort by package name per default
        ];

        return $this->getOrSetCache(self::CACHE_KEY, function () use ($query) {
            $response = $this->api->get('packages', compact('query'));

            return Collection::make($this->unpackResponseData($response))->keyBy(function($extension) {
                return ExtensionUtils::packageToId(Arr::get($extension, 'attributes.name'));
            })->toArray();
        });
    }

    /**
     * Updates the cache with the data from an API response
     * @param ResponseInterface $response
     */
    public function updateCacheFromResponse(ResponseInterface $response)
    {
        $extensions = $this->store->get(self::CACHE_KEY);

        $data = $this->unpackResponseData($response);

        // If the cache expired, there's no reason to update it. It will be refilled completely next time it's used
        // If the response contains no data we also exit
        if (!$extensions || empty($data)) {
            return;
        }

        $extensions_updated = Collection::make($extensions)->map(function ($extension) use ($data) {
            if (Arr::get($extension, 'id') === Arr::get($data, 'id')) {
                return $data;
            }

            return $extension;
        })->toArray();

        $this->store->put(self::CACHE_KEY, $extensions_updated, self::CACHE_EXPIRE);
    }

    /**
     * All extensions available
     * @return Collection
     */
    public function index()
    {
        return Collection::make($this->allExtensionsFromApi());
    }

    /**
     * A specific extension
     * @param string $extensionId Extension id (with $)
     * @return array
     */
    public function get($extensionId)
    {
        $extensions = $this->allExtensionsFromApi();

        return Arr::get($extensions, $extensionId);
    }
}
