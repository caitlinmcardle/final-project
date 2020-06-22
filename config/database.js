const url = require("url");
let settings = {
  client: process.env.NODE_ENV === "production" ? "postgres" : "sqlite3",
};
if (process.env.DATABASE_URL) {
  const parsed = url.parse(process.env.DATABASE_URL, true);
  const [username, password] = parsed.auth.split(":");
  settings.host = parsed.hostname;
  settings.port = Number(parsed.port);
  settings.database = parsed.pathname.substr(1);
  settings.username = username;
  settings.password = password;
  settings.ssl = {
    rejectUnauthorized: false,
  };
}
module.exports = {
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings,
      options: {},
    },
  },
};
