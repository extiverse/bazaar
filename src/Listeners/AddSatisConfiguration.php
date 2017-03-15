<?php

namespace Flagrow\Bazaar\Listeners;

use Flagrow\Bazaar\Composer\Utils\ComposerFileEditor;
use Flagrow\Bazaar\Events\TokenSet;
use Flagrow\Bazaar\Search\FlagrowApi;
use Illuminate\Contracts\Events\Dispatcher;
use Psr\Log\LoggerInterface;

class AddSatisConfiguration
{
    /**
     * @var LoggerInterface
     */
    private $log;

    function __construct(LoggerInterface $log)
    {
        $this->log = $log;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(TokenSet::class, [$this, 'setSatis']);
    }

    /**
     * @param TokenSet $event
     */
    public function setSatis(TokenSet $event)
    {
        $editor = new ComposerFileEditor(base_path('composer.json'));
        $host = FlagrowApi::getFlagrowHost() . '/satis';

        if ($editor->addRepository(
            'flagrow',
            $host,
            [
                'http' => [
                    'header' => [
                        'Authorization' => "Bearer {$event->token}"
                    ]
                ]
            ]
        )
        ) {
            $editor->saveToFile();
        } else {
            $this->log->alert("Could not write flagrow satis repository for host $host to composer.json.");
        }
    }
}
