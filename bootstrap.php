<?php

namespace Flagrow\Bazaar;

use Illuminate\Contracts\Events\Dispatcher;

return function(Dispatcher $events) {
    $events->subscribe(Listeners\AddApiControllers::class);
};
