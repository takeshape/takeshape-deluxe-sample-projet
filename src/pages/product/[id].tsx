import PageLoader from 'components/PageLoader';
import Wrapper from 'components/Wrapper/Content';
import ProductFromShopify from 'features/ProductPage/Product/ProductFromShopify';
import {
  ProductPageReviewsIoReviewsArgs,
  ProductPageReviewsIoReviewsQuery,
  ProductPageReviewsIoReviewsReponse,
  ProductPageShopifyProductArgs,
  ProductPageShopifyProductIdListQuery,
  ProductPageShopifyProductIdListResponse,
  ProductPageShopifyProductQuery,
  ProductPageShopifyProductReponse
} from 'features/ProductPage/queries';
import ReviewsFromReviewsIo from 'features/ProductPage/Reviews/ReviewsFromReviewsIo';
import RelatedProductsFromShopify from 'features/RelatedProducts/RelatedProductsFromShopify';
import Layout from 'layouts/Default';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { shopifyGidToId, shopifyIdToGid, shopifyProductToProduct } from 'transforms/shopify';
import { Product } from 'types/product';
import addApolloQueryCache from 'utils/apollo/addApolloQueryCache';
import { createAnonymousTakeshapeApolloClient } from 'utils/takeshape';
import { getSingle } from 'utils/types';

type ProductPageProps = Pick<Product, 'id' | 'name' | 'description'>;

const breadcrumbs = [
  { id: 1, name: 'Men', href: '#' },
  { id: 2, name: 'Clothing', href: '#' }
];

const ProductPage: NextPage<ProductPageProps> = ({ id, name, description }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout title="Product loading...">
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout title={name} description={description}>
      <div className="bg-white">
        <Wrapper>
          <ProductFromShopify component="withImageGrid" productId={id} breadcrumbs={breadcrumbs} />
          <ReviewsFromReviewsIo sku={shopifyGidToId(id)} />
          <RelatedProductsFromShopify collection="related-products" />
        </Wrapper>
      </div>
    </Layout>
  );
};

const apolloClient = createAnonymousTakeshapeApolloClient();

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const id = getSingle(params.id);

  const { data } = await apolloClient.query<ProductPageShopifyProductReponse, ProductPageShopifyProductArgs>({
    query: ProductPageShopifyProductQuery,
    variables: {
      id: shopifyIdToGid(id)
    }
  });

  // Just priming the cache
  await apolloClient.query<ProductPageReviewsIoReviewsReponse, ProductPageReviewsIoReviewsArgs>({
    query: ProductPageReviewsIoReviewsQuery,
    variables: {
      sku: id
    }
  });

  const product = shopifyProductToProduct(data.productList.items[0].shopifyProduct);

  return addApolloQueryCache(apolloClient, {
    props: {
      id: product.id,
      name: product.name,
      description: product.description
    }
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query<ProductPageShopifyProductIdListResponse>({
    query: ProductPageShopifyProductIdListQuery
  });

  const paths = data.products.items.map(({ shopifyProductId }) => ({
    params: { id: shopifyGidToId(shopifyProductId) }
  }));

  return {
    paths,
    fallback: true
  };
};

export default ProductPage;
