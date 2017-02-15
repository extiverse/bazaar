<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Extension\ExtensionManager;
use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Http\Controller\ControllerInterface;
use Psr\Http\Message\ServerRequestInterface;

class UpdateExtensionController implements ControllerInterface
{
    use AssertPermissionTrait;

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    /**
     * @param ExtensionManager $extensions
     */
    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(ServerRequestInterface $request)
    {
        return 'lol1';
        $this->assertAdmin($request->getAttribute('actor'));

        $install = array_get($request->getParsedBody(), 'install');
        $version = array_get($request->getParsedBody(), 'version');
        $name = array_get($request->getQueryParams(), 'name');

        if ($install === true) {
            $this->extensions->install($name, $version); // TODO: version ?
        }
    }
}
