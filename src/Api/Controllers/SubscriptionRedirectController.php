<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Search\FlagrowApi;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Http\UrlGenerator;
use Zend\Diactoros\Response\RedirectResponse;

abstract class SubscriptionRedirectController implements ControllerInterface
{
    protected function redirectToFlagrowIOSubscription($package, $subscribe = true)
    {
        /** @var UrlGenerator $flarumApi */
        $flarumApi = app(UrlGenerator::class);

        $url = sprintf(
            '%s/premium/%s/%s?redirect=%s',
            FlagrowApi::getFlagrowHost(),
            $package,
            ($subscribe ? '' : 'un') . 'subscribe',
            urlencode($flarumApi->to('api')->route('bazaar.callback.subscription'))
        );

        return new RedirectResponse($url);
    }
}
