import { useEffect } from "react";
import { Card } from "shared/ui/Card";
import { AppImage } from "shared/ui/AppImage";
import { Text } from "shared/ui/Text";
import { HStack, VStack } from "shared/ui/Stack";
import { classNames } from "shared/lib/classNames/classNames";
import { useNavigate } from "react-router-dom";
import { getRouteDetails } from "shared/const/router";
import { Skeleton } from "shared/ui/Skeleton";
import { Button } from "shared/ui/Button";
import { useBeerStore } from "entities/Beer/model/store";
import cls from "./MainPage.module.scss";

const MainPage = () => {
  const navigate = useNavigate();
  const {
    beers,
    selectedBeers,
    fetchBeers,
    deleteSelectedBeers,
    setSelectedBeers,
    clearSelectedBeers,
    isBeersLoading,
    incrementPage,
    isBeersError,
    page,
  } = useBeerStore();

  useEffect(() => {
    if (!!beers.length) {
      return;
    }
    fetchBeers();
  }, [fetchBeers, page, beers]);

  useEffect(() => {
    if (!beers.length && isBeersLoading === false) {
      incrementPage();
    }
  }, [incrementPage, beers, isBeersLoading]);

  const handleBeerClick = (beerId: number) => {
    navigate(getRouteDetails(String(beerId)));
  };

  const handleRightClick = (e: React.MouseEvent, beerId: number) => {
    e.preventDefault();
    setSelectedBeers(beerId);
  };

  const handleDeleteSelected = () => {
    deleteSelectedBeers();
  };

  const handleClearAllSelected = () => {
    clearSelectedBeers();
  };

  if (isBeersLoading) {
    return (
      <VStack max gap="32">
        <Card max className={cls.header}>
          <Skeleton width={138} height={32} />
        </Card>
        <VStack gap="16" max className={cls.CardsWrapper}>
          {[...Array(5)].map((_, index) => (
            <Card max key={index}>
              <HStack gap="16" align="start" justify="between">
                <VStack gap="8">
                  <Skeleton width={150} height={32} />
                  <Skeleton width={500} height={24} />
                </VStack>
                <Skeleton width={100} height={200} />
              </HStack>
            </Card>
          ))}
        </VStack>
      </VStack>
    );
  }

  if (isBeersError) {
    return <Text title="A server error has occurred" variant="error" />;
  }

  return (
    <>
      <Card max className={cls.header}>
        <HStack justify="between">
          <Text title="Beer Recipes" />
          {selectedBeers.length > 0 && (
            <HStack gap="16">
              <Button onClick={handleDeleteSelected} variant="filled">
                Delete
              </Button>
              <Button onClick={handleClearAllSelected} variant="filled">
                Clear all selected
              </Button>
            </HStack>
          )}
        </HStack>
      </Card>
      <VStack gap="16" max className={cls.CardsWrapper}>
        {beers.slice(0, 15).map((beer) => (
          <Card
            onContextMenu={(e) => handleRightClick(e, beer.id)}
            onClick={
              selectedBeers.length
                ? (e) => handleRightClick(e, beer.id)
                : () => handleBeerClick(beer.id)
            }
            max
            key={beer.id}
            className={classNames(cls.Card, {
              [cls.selected]: selectedBeers.includes(beer.id),
            })}
          >
            <HStack gap="16" align="start" justify="between">
              <Text title={beer.name} text={beer.description} />
              <AppImage
                src={beer.image_url}
                alt={beer.name}
                width={50}
                fallback={<Skeleton width={100} height={200} />}
              />
            </HStack>
          </Card>
        ))}
      </VStack>
    </>
  );
};

export default MainPage;
