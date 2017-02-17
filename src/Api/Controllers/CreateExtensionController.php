<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Api\Serializer\ExtensionSerializer;
use Flagrow\Bazaar\Extension\ExtensionManager;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateExtensionController extends AbstractCreateController
{
    use AssertPermissionTrait;

    /**
     * {@inheritdoc}
     */
    public $serializer = ExtensionSerializer::class;

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

        $name = array_get($request->getParsedBody(), 'name');
        $version = array_get($request->getParsedBody(), 'version');

        $this->extensions->install($name, $version);

        return $this->extensions->getExtension($name);
    }
}
