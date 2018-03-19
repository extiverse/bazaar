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
                'Flarum-Version' => app()->version(),
                'Bazaar-Version' => static::getBazaarVersion()
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
        return Arr::get(static::$flarumConfig, 'flagrow', 'https://flagrow.io');
    }

    /**
     * The url specified in the config.php.
     *
     * @return string
     */
    public static function getFlarumHost()
    {
        return Arr::get(static::$flarumConfig, 'url');
    }

    /**
     * @return null|string
     */
    public static function getBazaarVersion()
    {
        /** @var ExtensionManager $extensions */
        $extensions = app(ExtensionManager::class);
        $bazaar = $extensions->getExtension('flagrow-bazaar');

        return $bazaar ? $bazaar->getVersion() : null;
    }

    /**
     * Injects updating the connected state for calls to Flagrow.
     *
     * @param HandlerStack $stack
     */
    protected function readBazaarConnectedState(HandlerStack &$stack)
    {
        $stack->push(Middleware::mapResponse(function (ResponseInterface $response) {

            if ($response->getStatusCode() > 201) {
                return $response;
            }

            // Bazaar-Connected will contain the date of connection as a Iso8601 date or "0" if not connected
            $connectedHeaders = $response->getHeader('Bazaar-Connected');
            $connected = count($connectedHeaders) > 0 && $connectedHeaders[0] !== '0';
            app()->make(SettingsRepositoryInterface::class)->set('flagrow.bazaar.connected', $connected ? 1 : 0);

            return $response;
        }));
    }

    /**
     * @return string|null
     */
    public static function getToken()
    {
        return app()->make(SettingsRepositoryInterface::class)->get('flagrow.bazaar.api_token');
    }
}
