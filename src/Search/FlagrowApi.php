<?php

namespace Flagrow\Bazaar\Search;

use Flarum\Extension\ExtensionManager;
use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\CurlHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;

/**
 * Class FlagrowApi
 * @package Flagrow\Bazaar\Search
 *
 * @info Contextually binding the Guzzle client wasn't working. Something was very off, this works though.
 */
class FlagrowApi extends Client
{
    public function __construct(array $config = [])
    {
        /** @var array $configFile */
        $configFile = app('flarum.config');
        /** @var ExtensionManager $extensions */
        $extensions = app(ExtensionManager::class);
        $bazaar = $extensions->getExtension('flagrow-bazaar');

        $host = Arr::get($configFile, 'flagrow', 'https://flagrow.io');
        $headers = [];

        if ($token = app()->make(SettingsRepositoryInterface::class)->get('flagrow.bazaar.api_token')) {
            $headers['Authorization'] = 'Bearer ' . $token;
        }

        $stack = new HandlerStack();
        $stack->setHandler(new CurlHandler());

        $this->readBazaarConnectedState($stack);

        parent::__construct(array_merge([
            'handler' => $stack,
            'base_uri' => "$host/api/",
            'headers' => array_merge([
                'Accept' => 'application/vnd.api+json, application/json',
                'Bazaar-From' => Arr::get($configFile, 'url'),
                'Flarum-Version' => app()->version(),
                'Bazaar-Version' => $bazaar ? $bazaar->getVersion() : null
            ], $headers)
        ], $config));
    }

    /**
     * Injects updating the connected state for calls to Flagrow.
     *
     * @param HandlerStack $stack
     */
    protected function readBazaarConnectedState(HandlerStack &$stack)
    {
        $stack->push(Middleware::mapResponse(function (ResponseInterface $response) {
            if ($response->hasHeader('Bazaar-Connected')) {
                app()->make(SettingsRepositoryInterface::class)->set('flagrow.bazaar.connected', 1);
            } else {
                app()->make(SettingsRepositoryInterface::class)->set('flagrow.bazaar.connected', 0);
            }

            return $response;
        }));
    }
}
