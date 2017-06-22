<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CancelBuyExtensionController extends ConnectedExtensionResourceController
{
    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     * @throws \Exception
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->checkConnected();

        $response = $this->extensions->buy(
            Arr::get($request->getQueryParams(), 'id'),
            false
        );

        if ($response) {
            return $response;
        }

        throw new \Exception('Could not cancel buy, connection to service failed.');
    }
}
