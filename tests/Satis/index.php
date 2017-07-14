<?php

require_once 'FakeServer.php';

$server = new \Flagrow\Bazaar\Tests\Satis\FakeServer();
$server->handleRequest();
