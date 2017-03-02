<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Api\Serializers\ExtensionSerializer;
use Flagrow\Bazaar\Search\AbstractExtensionSearcher;
use Flarum\Api\Controller\AbstractCollectionController;
use Flarum\Api\UrlGenerator;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListExtensionController extends AbstractCollectionController
{
    use AssertPermissionTrait;

    /**
     * @inheritdoc
     */
    public $serializer = ExtensionSerializer::class;

    /**
     * @var AbstractExtensionSearcher
     */
    protected $searcher;

    /**
     * @var UrlGenerator
     */
    protected $url;

    public function __construct(AbstractExtensionSearcher $searcher, UrlGenerator $url)
    {
        $this->searcher = $searcher;
        $this->url = $url;
    }

    /**
     * @inheritdoc
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $offset = $this->extractOffset($request);

        // Limit is never used, we use the one from flagrow.io
        // Offset is used as page number, so it does not reflect the true offset
        $results = $this->searcher->search(null, $offset);

        $document->addPaginationLinks(
            $this->url->toRoute('bazaar.extensions.index'),
            $request->getQueryParams(),
            $offset,
            1, // Add one to the offset to get next page number
            $results->areMoreResults() ? null : 0
        );

        return $results->getResults();
    }
}
