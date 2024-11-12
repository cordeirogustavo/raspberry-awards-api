export type TProducerInner = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
  intervalFlag: string;
};

export type TProducerAwardsIntervalDTO = {
  min: Partial<TProducerInner>[];
  max: Partial<TProducerInner>[];
};
