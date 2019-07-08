<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Extiverse\Bazaar\Search\FlagrowApi;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class ConnectController implements RequestHandlerInterface
{
    /**
     * @var FlagrowApi
     */
    private $api;

    function __construct(FlagrowApi $api)
    {
        $this->api = $api;
    }

    /**
     * @param ServerRequestInterface $request
     * @return ResponseInterface
     * @throws \Exception
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $response = $this->api->get('bazaar/connect');

        if ($response->getStatusCode() == 200) {
            return $response;
        }

        throw new \Exception('Connecting failed');
    }
}
