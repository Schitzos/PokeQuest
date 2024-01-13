import React from 'react';
import TextView from '@/components/TextView';
import {
  getBerryDetail,
  getBerryItemDetail,
} from '@/services/berry/berry.service';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

export interface BerryItemProps {
  name: any;
}

export interface BerryItemDataResponse {
  name: any;
  item: {
    url: string;
  };
}

export interface BerryItemDetailDataResponse {
  sprites: {
    default: string;
  };
}

export default function BerryItem({name}: BerryItemProps) {
  const berryDetail = getBerryDetail({
    key: ['getBerryDetail', name],
    name: name,
  });

  const berry = (berryDetail.data || {}) as BerryItemDataResponse;
  const berryId = berry?.item?.url?.split('/').slice(-2, -1)[0];

  const berryItemDetail = getBerryItemDetail({
    key: ['getBerryItemDetail', name],
    id: berryId,
  });

  const itemDetail = (berryItemDetail.data ||
    {}) as BerryItemDetailDataResponse;
  const itemImage = itemDetail?.sprites?.default || '';

  return (
    <TouchableOpacity style={styles.base}>
      {itemImage && (
        <Image
          style={styles.artwork}
          source={{
            uri: itemImage,
          }}
        />
      )}
      <TextView>{berry.name}</TextView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '20%',
    height: 25,
    alignItems: 'center',
  },
  artwork: {
    width: 24,
    height: 24,
  },
});
