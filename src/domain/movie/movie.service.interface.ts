export interface IMovieService {
  import(filePath: string): Promise<void>;
}
