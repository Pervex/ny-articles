interface ErrorProperties {
  readonly message: string,
}

function ErrorComponent({ message }: ErrorProperties) {
  return (
    <div data-testid="error-component" className="mt-10 rounded-md p-4 w-2xs justify-center text-red-400">
      { message }
    </div>
  );
}

export default ErrorComponent;
