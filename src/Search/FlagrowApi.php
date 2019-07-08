<?php

namespace Extiverse\Bazaar\Search;

use Flarum\Extension\ExtensionManager;
use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\CurlHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;

final class FlagrowApi extends Client
{
    /**
     * @var array
     */
    protected static $flarumConfig;

    public function __construct(array $config = [])
    {
        static::$flarumConfig = app('flarum.config');

        $headers = [];

        if ($token = static::getToken()) {
            $headers['Authorization'] = "Bearer $token";
        }

        $stack = new HandlerStack();
        $stack->setHandler(new CurlHandler());

        $this->readBazaarConnectedState($stack);

        parent::__construct(array_merge([
            'handler' => $stack,
            'base_uri' => sprintf("%s/api/", static::getFlagrowHost()),
            'headers' => array_merge([
                'Accept' => 'application/vnd.api+json, application/json',
                'Bazaar-From' => static::getFlarumHost(),
                'Flarum-Version' => static::getFlarumVersion(),
                'Bazaar-Version' => static::getBazaarVersion()
            ], $headers)
        ], $config));
    }

    public static function getFlagrowHost(): string
    {
        return Arr::get(static::$flarumConfig, 'flagrow', 'https://flagrow.io');
    }

    public static function getFlarumHost(): string
    {
        return Arr::get(static::$flarumConfig, 'url');
    }

    public static function getFlarumVersion(): string
    {
        return Arr::get(static::$flarumConfig, 'force-version', app()->version());
    }

    public static function getBazaarVersion(): ?string
    {
        /** @var ExtensionManager $extensions */
        $extensions = app(ExtensionManager::class);
        $bazaar = $extensions->getExtension('flagrow-bazaar');

        return $bazaar ? $bazaar->getVersion() : null;
    }

    protected function readBazaarConnectedState(HandlerStack &$stack)
    {
        $stack->push(Middleware::mapResponse(function (ResponseInterface $response) {
            /** @var SettingsRepositoryInterface $settings */
            $settings = app()->make(SettingsRepositoryInterface::class);

            if ($response->getStatusCode() === 401) {
                $settings->delete('flagrow.bazaar.api_token');
            }

            if ($response->getStatusCode() === 200) {
                // Bazaar-Connected will contain the date of connection as a Iso8601 date or "0" if not connected
                $connectedHeaders = $response->getHeader('Bazaar-Connected');
                $connected = count($connectedHeaders) > 0 && $connectedHeaders[0] !== '0';
                $settings->set('flagrow.bazaar.connected', $connected ? 1 : 0);
            }

            return $response;
        }));
    }

    public static function getToken(): ?string
    {
        return app()->make(SettingsRepositoryInterface::class)->get('flagrow.bazaar.api_token');
    }
}
