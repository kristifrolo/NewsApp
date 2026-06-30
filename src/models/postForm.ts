export interface IPostFormProps {
  onSubmit: (data: { title: string, body: string }) => void;
  isLoading: boolean;
}