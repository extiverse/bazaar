<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Api\Serializers\ExtensionSerializer;
use Flagrow\Bazaar\Extensions\ExtensionManager;
use Flagrow\Bazaar\Extensions\ExtensionUtils;
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

        $extensionId = array_get($request->getParsedBody(), 'id');

        $this->extensions->install($extensionId);

        $name = ExtensionUtils::idToShortName($extensionId);

        return $this->extensions->getExtension($name);
    }
}
