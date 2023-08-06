import authMiddleware from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async.catch';

import productController from '../../../adapters/controllers/product.controller';
import productDbRepo from '../../../application/repositories/IProductDb.repo';
import productDbRepoImpl from '../../database/mongodb/repositories/productDb.repo';

export default function productRouter(express) {
   const router = express.Router();
   const controller = productController(productDbRepo, productDbRepoImpl);

   const auth = authMiddleware();

   router.get('/search/:keySearch', asyncHandler(controller.searchProducts));
   router.get('/', asyncHandler(controller.findAllProducts));
   router.get('/:productId', asyncHandler(controller.findProduct));

   router.use(asyncHandler(auth.authentication));

   router.post('/', asyncHandler(controller.createProduct));
   router.patch('/:productId', asyncHandler(controller.updateProduct));
   router.get('/drafts/all', asyncHandler(controller.getAllDraftsForShop));
   router.get(
      '/published/all',
      asyncHandler(controller.getAllPublishedForShop)
   );

   return router;
}
