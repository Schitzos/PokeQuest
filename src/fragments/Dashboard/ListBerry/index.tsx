import React, {useEffect, useRef, useState} from 'react';
import {View, ActivityIndicator, Animated, Image} from 'react-native';
import {getBerryDetail, getListBerry} from '@/services/berry/berry.service';
import BerryItem, {BerryItemDetailDataResponse} from '../BerryItem';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import TextView from '@/components/TextView';
import FastImage from 'react-native-fast-image';
import Skeleton from '@/components/Skeleton';
import {usePokemon} from '@/hooks/usePokemon';
import {berryFirmnessHeightScale} from '@/utils/berry';
import {WalkY} from '@/utils/animation';
import {styles} from './styles';

export interface ListBerryDataResponse {
  results: BerryItem[];
  count: number;
  previous: string | null;
  next: string | null;
}

export interface BerryItem {
  name: string;
  url: string;
}
const ITEMS_PER_PAGE = 9;

export default function ListBerry() {
  const [selectedBerry, setSelectedBerry] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleBerries, setVisibleBerries] = useState<BerryItem[]>([]);
  const {pokemon, setPokemon} = usePokemon();
  const bouncingAnimation = useRef(new Animated.Value(0)).current;

  const berryList = getListBerry({
    key: ['getListBerry'],
    limit: 100,
  });

  const berries = (berryList?.data || {}) as ListBerryDataResponse;

  const berryItemDetail = getBerryDetail({
    key: ['getBerryDetail', selectedBerry || ''],
    name: selectedBerry || '',
  });

  const berryDetail = (berryItemDetail.data ||
    {}) as BerryItemDetailDataResponse;

  const handleNext = () => {
    if (currentPage < Math.ceil(berries.count / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectBerry = (val: string) => {
    setSelectedBerry(val);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const berriesToShow = berries?.results?.slice(startIndex, endIndex);
    setVisibleBerries(berriesToShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, berryList.data]);

  const translateY = new Animated.Value(0);
  const translateX = new Animated.Value(0);
  let offset = {x: 0, y: 0};

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      offset.x += event.nativeEvent.translationX;
      offset.y += event.nativeEvent.translationY;
      translateX.setOffset(offset.x);
      translateY.setOffset(offset.y);
      translateX.setValue(0);
      translateY.setValue(0);
    }

    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translationY <= -150
    ) {
      handleFeed({
        berryName: selectedBerry,
        berryFirmness: berryDetail?.firmness?.name,
      });
      offset = {x: 0, y: 0};
      translateX.setOffset(0);
      translateY.setOffset(0);
      translateX.setValue(0);
      translateY.setValue(0);
    }

    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translationY >= -150
    ) {
      offset = {x: 0, y: 0};
      translateX.setOffset(0);
      translateY.setOffset(0);
      translateX.setValue(0);
      translateY.setValue(0);
    }
  };

  const handleFeed = (val: {berryName: string; berryFirmness: string}) => {
    let heightCalculate;
    if (
      !pokemon?.selected.prevBerry ||
      pokemon.selected.prevBerry !== val.berryFirmness
    ) {
      heightCalculate =
        pokemon?.selected.currentExp! +
        berryFirmnessHeightScale[val.berryFirmness];
    } else {
      heightCalculate =
        pokemon.selected.currentExp -
        berryFirmnessHeightScale[val.berryFirmness] * 2;
    }

    const temp = {
      detail: pokemon?.detail,
      species: pokemon?.species,
      selected: {
        ...pokemon?.selected,
        currentExp: heightCalculate <= 0 ? 0 : heightCalculate,
        prevExp: pokemon?.selected.currentExp,
        prevBerry: val.berryFirmness,
      },
    };
    setPokemon(temp);
  };

  useEffect(() => {
    Animated.loop(WalkY(bouncingAnimation, 1000)).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [berryDetail]);

  return (
    <View style={styles.berryContainer}>
      <View style={styles.berryList}>
        {berryList.isFetching && (
          <View style={styles.skeletonContainer}>
            <Skeleton height={24} />
            <Skeleton height={24} />
            <Skeleton height={24} />
          </View>
        )}
        {!berryList.isFetching &&
          visibleBerries?.map((berry: BerryItem) => {
            return (
              <BerryItem
                name={berry.name}
                key={berry.name}
                handleSelectBerry={handleSelectBerry}
                selectedBerry={selectedBerry}
              />
            );
          })}
        {!berryList.isFetching && (
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => handlePrev()}
              disabled={currentPage === 1}>
              <TextView fz={12}>{'< Prev'}</TextView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNext()}
              disabled={
                currentPage === Math.ceil(berries?.count / ITEMS_PER_PAGE)
              }>
              <TextView fz={12}>{'Next >'}</TextView>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FastImage
        source={require('@assets/images/stat-frame.png')}
        style={styles.berryDetail}
        defaultSource={require('@assets/images/default_image_loading.png')}
        resizeMode={FastImage.resizeMode.stretch}>
        <TextView>{selectedBerry ? selectedBerry : 'Select Berry'}</TextView>
        {selectedBerry && (
          <View style={styles.flexRow}>
            <TextView fz={10} align="center">
              Firmness
            </TextView>
            <TextView fz={10} align="center">
              :{' '}
              {berryItemDetail.isFetching ? (
                <ActivityIndicator style={styles.cusLoading} />
              ) : (
                berryDetail?.firmness?.name
              )}
            </TextView>
          </View>
        )}
      </FastImage>
      {!berryItemDetail.isFetching && (
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.View
            style={[
              {
                transform: [
                  {translateY: translateY},
                  {translateY: bouncingAnimation},
                  {translateX: translateX},
                ],
              },
            ]}>
            <Image
              style={styles.berryArt}
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${selectedBerry}-berry.png`,
              }}
            />
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
}
