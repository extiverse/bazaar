<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Extension\ExtensionManager;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateExtensionController extends AbstractResourceController
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
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $name = array_get($request->getQueryParams(), 'name');
        $version = array_get($request->getParsedBody(), 'version');

        $this->extensions->install($name, $version);

        return $this->extensions->getExtension($name);
    }
}
