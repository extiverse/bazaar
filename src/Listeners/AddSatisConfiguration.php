<?php

namespace Extiverse\Bazaar\Listeners;

use Extiverse\Bazaar\Composer\ComposerEnvironment;
use Extiverse\Bazaar\Composer\Utils\ComposerFileEditor;
use Extiverse\Bazaar\Events\TokenSet;
use Extiverse\Bazaar\Search\FlagrowApi;
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
        /** @var ComposerEnvironment $env */
        $env = app()->make(ComposerEnvironment::class);
        $editor = new ComposerFileEditor($env->getComposerJsonPath());
        $host = FlagrowApi::getFlagrowHost() . '/satis';

        if ($this->setFlagrowSatis($event, $editor, $host)) {
            $editor->saveToFile();
        } else {
            $this->log->alert("Could not write flagrow satis repository for host $host to composer.json.");
        }
    }

    /**
     * @param TokenSet $event
     * @param $editor
     * @param $host
     * @return mixed
     */
    protected function setFlagrowSatis(TokenSet $event, ComposerFileEditor $editor, $host)
    {
        return $editor->addRepository(
            'flagrow',
            $host,
            [
                'http' => [
                    'header' => [
                        "Authorization: Bearer {$event->token}"
                    ]
                ]
            ]
        );
    }
}
