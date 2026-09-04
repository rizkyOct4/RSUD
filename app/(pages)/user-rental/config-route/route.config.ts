export type GetProps =
  | {
      key: "statistics";
      currentPath: string;
    }
  | {
      key: "carRental";
      currentPath: string;
      pageParam: number;
      limit: number;
    };
export type PostProps = {
  key: "postCar";
  currentPath: string;
};

export const ROUTES_USER_RENTAL = {
  GET: (props: GetProps) => {
    const { key, currentPath } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "statistics":
        break;
      case "carRental":
        params.set("page-param", String(props.pageParam));
        params.set("limit", String(props.limit));
        break;

      default:
        return "";
    }

    return `${currentPath}/api?${params.toString()}`;
  },
  POST: (props: PostProps) => {
    const { key, currentPath } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "postCar":
        break;
      default:
        return "";
    }

    return `${currentPath}/api/action?${params.toString()}`;
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
