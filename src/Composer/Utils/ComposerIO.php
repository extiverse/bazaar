<?php

namespace Extiverse\Bazaar\Composer\Utils;

use Composer\IO\BufferIO;
use Extiverse\Bazaar\Exceptions\ComposerException;
use Symfony\Component\Console\Output\StreamOutput;

class ComposerIO extends BufferIO
{
    public function __construct()
    {
        // Using StreamOutput::VERBOSITY_DEBUG allows us to get debug messages from the Composer Factory for example
        parent::__construct('', StreamOutput::VERBOSITY_DEBUG, null);
    }

    /**
     * @inheritdoc
     */
    public function writeError($messages, $newline = true, $verbosity = self::NORMAL)
    {
        // As all console output goes through this method, we need to find out if it contains an error
        if (substr($messages, 0, 7) === '<error>') {
            throw new ComposerException($messages);
        }

        parent::writeError($messages);
    }
}
