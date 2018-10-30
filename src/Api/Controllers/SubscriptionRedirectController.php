<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Extensions\Extension;
use Flagrow\Bazaar\Repositories\ExtensionRepository;
use Flagrow\Bazaar\Search\FlagrowApi;
use Flarum\Http\UrlGenerator;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\RedirectResponse;

abstract class SubscriptionRedirectController implements RequestHandlerInterface
{
    protected function redirectToFlagrowIOSubscription($package, $subscribe = true)
    {
        /** @var UrlGenerator $flarumApi */
        $flarumApi = app(UrlGenerator::class);

        $extensions = app(ExtensionRepository::class);
        /** @var Extension $extension */
        $extension = $extensions->getExtension($package);

        $url = sprintf(
            '%s/extensions/%s/subscription?redirect=%s',
            FlagrowApi::getFlagrowHost(),
            $extension->getPackage(),
            urlencode($flarumApi->to('api')->route('bazaar.callback.subscription'))
        );

        return new RedirectResponse($url);
    }
}
