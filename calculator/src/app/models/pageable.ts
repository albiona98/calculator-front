/**
 * Interface used to request pageable and sortable resources.
 * Sort format should be propertyName,direction (ex. name,ASC)
 */
export interface Pageable {
  size?: number;
  page?: number;
  // Sort format is propertyName,direction (ex. name,ASC)
  sort?: string | string[];
  paged?: boolean;
}
