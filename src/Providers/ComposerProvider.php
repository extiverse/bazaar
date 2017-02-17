<?php

namespace Flagrow\Bazaar\Providers;

use Flagrow\Bazaar\Composer\ComposerCommand;
use Flagrow\Bazaar\Composer\ComposerCommandFactory;
use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Foundation\Application;

class ComposerProvider extends AbstractServiceProvider
{
    public function boot()
    {
        $this->app->bind(ComposerCommand::class, function(Application $app) {
            return ComposerCommandFactory::create($app);
        });
    }
}
