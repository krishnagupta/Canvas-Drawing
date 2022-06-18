const CommandError = ({ error }) => {
  return (
    <ul data-testid="error_label">
      {error.map((err, i) => (
        <li key={i}>{err}</li>
      ))}
    </ul>
  );
};

export default CommandError;
