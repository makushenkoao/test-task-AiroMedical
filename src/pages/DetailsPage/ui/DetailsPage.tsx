import { Card } from "shared/ui/Card";
import { Text } from "shared/ui/Text";
import { VStack } from "shared/ui/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { AppImage } from "shared/ui/AppImage";
import { Skeleton } from "shared/ui/Skeleton";
import { useBeerStore } from "entities/Beer/model/store";
import cls from "./DetailsPage.module.scss";

const DetailsPage = () => {
  const params = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    beers,
    isBeersLoading,
    isBeersError,
    fetchBeers,
    page,
    isLastPage,
    incrementPage,
    setPage,
    setBeers,
  } = useBeerStore();
  const beer = beers.find(({ id }) => id === Number(params.id));
  const { current: pageRef } = useRef(page);
  const { current: beersRef } = useRef(beers);

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers, page]);

  useEffect(() => {
    if (!beers && !isBeersLoading && !isLastPage) {
      incrementPage();
      return;
    }
  }, [incrementPage, isLastPage, beers, isBeersLoading]);

  const handleClick = () => {
    setPage(pageRef);
    setBeers(beersRef);
    navigate(-1);
  };

  if (isBeersLoading) {
    return (
      <Card max>
        <Skeleton width={35} height={20} />
        <VStack gap="16" max>
          <VStack gap="8" align="center" max>
            <Skeleton width={200} height={200} />
            <VStack gap="8">
              <Skeleton width={200} height={32} />
              <Skeleton width={200} height={24} />
            </VStack>
          </VStack>
          <Skeleton height={300} />
        </VStack>
      </Card>
    );
  }

  if (isBeersError || !beer) {
    return <Text title="A server error has occurred" variant="error" />;
  }

  return (
    <Card max>
      <button onClick={handleClick}>Back</button>
      <VStack gap="16" max>
        <VStack gap="8" align="center" max>
          <AppImage
            src={beer.image_url}
            alt={beer.name}
            width={100}
            height={100}
            fallback={<Skeleton width={200} height={200} />}
          />
          <Text title={beer.name} text={beer.tagline} align="center" size="l" />
        </VStack>
        <Text title="Description:" text={beer.description} />
        <Text title="Ingredients:" />
        <table className={cls.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Add</th>
              <th>Attribute</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4}>
                <Text text="Hope" align="center" />
              </td>
            </tr>
            {beer.ingredients.hops.map((hop, index) => (
              <tr key={index}>
                <td>{hop.name}</td>
                <td>
                  {hop.amount.value} {hop.amount.unit}
                </td>
                <td>{hop.add}</td>
                <td>{hop.attribute}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}>
                <Text text="Malt" align="center" />
              </td>
            </tr>
            {beer.ingredients.malt.map((hop, index) => (
              <tr key={index}>
                <td>{hop.name}</td>
                <td>
                  {hop.amount.value} {hop.amount.unit}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <Text text="Yeast" align="center" />
              </td>
            </tr>
            <tr>
              <td>{beer.ingredients.yeast}</td>
            </tr>
          </tfoot>
        </table>
        <Text title="Brewers tips:" text={beer.brewers_tips} />
      </VStack>
    </Card>
  );
};

export default DetailsPage;
