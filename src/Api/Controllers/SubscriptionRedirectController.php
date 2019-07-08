<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Extiverse\Bazaar\Extensions\Extension;
use Extiverse\Bazaar\Repositories\ExtensionRepository;
use Extiverse\Bazaar\Search\FlagrowApi;
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
