<?php

namespace Flagrow\Bazaar\Search;

use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client;
use Illuminate\Support\Arr;

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
        $host = static::getFlagrowHost();
        $headers = [];

        if ($token = app()->make(SettingsRepositoryInterface::class)->get('flagrow.bazaar.api_token')) {
            $headers['Authorization'] = 'Bearer ' . $token;
        }

        parent::__construct(array_merge([
            'base_uri' => "$host/api/",
            'headers' => array_merge([
                'Accept' => 'application/vnd.api+json, application/json',
                'Bazaar-From' => static::getFlarumHost(),
                'Flarum-Version' => app()->version()
            ], $headers)
        ], $config));
    }

    /**
     * The hostname to connect with Flagrow.io.
     *
     * @return string
     */
    public static function getFlagrowHost()
    {
        $configFile = app()->make('flarum.config');

        return Arr::get($configFile, 'flagrow', 'https://flagrow.io');
    }

    /**
     * The url specified in the config.php.
     *
     * @return string
     */
    public static function getFlarumHost()
    {
        $configFile = app()->make('flarum.config');

        return Arr::get($configFile, 'url');
    }
}
