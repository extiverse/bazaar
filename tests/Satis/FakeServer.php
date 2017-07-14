<?php

namespace Flagrow\Bazaar\Tests\Satis;

/**
 * Start a php dev server to use as a Satis endpoint
 * @see https://stackoverflow.com/a/13137944/3133038
 */
class FakeServer
{
    protected $pid;

    public function getAddress()
    {
        return '127.0.0.1:8027';
    }

    public function getUrl()
    {
        return 'http://' . $this->getAddress();
    }

    public function getDownloadPath()
    {
        return '/download/package.tar';
    }

    public function start()
    {
        $cmd = sprintf('cd %s && php -S %s index.php', __DIR__, $this->getAddress());

        $out = shell_exec(sprintf("%s > /dev/null 2>&1 & echo $!", $cmd));
        $this->pid = intval($out);

        sleep(1);
    }

    public function kill()
    {
        if ($this->pid) {
            shell_exec('kill -9 ' . $this->pid);
        }
    }

    public function handleRequest()
    {
        $uri = urldecode(
            parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
        );

        if ($uri === '/packages.json') {
            echo str_replace('%SATIS-ARCHIVE-SHA%', sha1_file('data/archive.tar'), str_replace('%SATIS-ARCHIVE-URL%', $this->getUrl() . $this->getDownloadPath(), file_get_contents('data/packages.json')));
            exit();
        }

        if ($uri === $this->getDownloadPath()) {
            echo file_get_contents('data/archive.tar');
            exit();
        }

        exit('Invalid request');
    }
}
