<?php

namespace Flagrow\Bazaar\Composer;

use Flarum\Foundation\Application;

class ComposerCommandFactory
{
    /**
     * Create a new ComposerCommand with default paths
     * @param Application $app
     * @return ComposerCommand
     */
    public static function create(Application $app)
    {
        return new ComposerCommand(
            $app->storagePath().'/composer',
            $app->storagePath().'/tmp/composer-vendor'
        );
    }
}
