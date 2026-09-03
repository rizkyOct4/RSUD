export type GetProps = {
  key: "profile";
};
export type PostProps = {
  key: "register" | "acceptedCookies";
};

export const ROUTES_AUTH = {
  GET: (props: GetProps) => {
    const { key } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "profile":
        break;

      default:
        return "";
    }

    return `/auth/api?${params.toString()}`;
  },
  POST: (props: PostProps) => {
    const { key } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "register":
      case "acceptedCookies":
        break;
      default:
        return "";
    }

    return `/auth/api/action?${params.toString()}`;
  },
  //   PUT: (props: PutProps) => {
  //     const { key, currentPath } = props;
  //     const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

  //     params.set("key", key);
  //     switch (key) {
  //       case "putTransaction":
  //         return `${currentPath}/api/action?${params.toString()}`;
  //       default:
  //         return "";
  //     }
  //   },
  //   DELETE: (props: DeleteProps) => {
  //     const { key, currentPath } = props;
  //     const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

  //     params.set("key", key);
  //     switch (key) {
  //       case "deleteTransaction":
  //         return `${currentPath}/api/action?${params.toString()}`;
  //       default:
  //         return "";
  //     }
  //   },
};
