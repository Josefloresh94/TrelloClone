export interface ColumnConfig {
  name: string;
  header: string;
  field: string;
  type?: 'text' | 'image' | 'action';
  showTotal?: boolean;
}
