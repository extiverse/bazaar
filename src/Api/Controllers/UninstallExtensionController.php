<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Extension\ExtensionManager;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;

class UninstallExtensionController extends AbstractDeleteController
{
    use AssertPermissionTrait;

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    /**
     * @param ExtensionManager $extensions Get our own Extension Manager (does not come from the container)
     */
    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
    }

    /**
     * {@inheritdoc}
     */
    protected function delete(ServerRequestInterface $request)
    {
        return 'lol2';
        $this->assertAdmin($request->getAttribute('actor'));

        $name = array_get($request->getQueryParams(), 'name');

        $extension = $this->extensions->getExtension($name);
        $this->extensions->uninstall($extension);
    }
}
