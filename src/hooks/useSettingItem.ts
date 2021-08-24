import { getSettingValueByKey, NarrowAction } from '@tager/web-modules';

import { useTypedSelector } from '@/store/store';
import { selectSettingItemList } from '@/store/reducers/tager/settings';
import { SettingsItemType } from '@/typings/model';

export function useSettingItem<K extends SettingsItemType['key']>(
  key: K
): NarrowAction<SettingsItemType, K>['value'] {
  const settingItemList = useTypedSelector(selectSettingItemList);

  return getSettingValueByKey(settingItemList, key);
}
