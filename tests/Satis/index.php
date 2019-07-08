<?php

require_once 'FakeServer.php';

$server = new \Extiverse\Bazaar\Tests\Satis\FakeServer();
$server->handleRequest();
