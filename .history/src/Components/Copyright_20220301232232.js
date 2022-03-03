export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://nadhoir.com/">
        Code Master
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
