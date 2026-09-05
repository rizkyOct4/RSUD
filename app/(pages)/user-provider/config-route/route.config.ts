export type GetProps =
  | {
      key: "statistics";
      currentPath: string;
    }
  | {
      key: "carFilterBrand";
      currentPath: string;
      brand: string;
      pageParam: number;
      limit: number;
    }
  | {
      key: "car";
      currentPath: string;
      pageParam: number;
      limit: number;
    };
export type PostProps = {
  key: "postCar";
  currentPath: string;
};
export type PutProps = {
  key: "confirmCarReturn";
  currentPath: string;
};

export const ROUTES_USER_PROVIDER = {
  GET: (props: GetProps) => {
    const { key, currentPath } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "statistics":
        break;
      case "carFilterBrand":
        params.set("brand", props.brand);
        params.set("page-param", String(props.pageParam));
        params.set("limit", String(props.limit));
        break;
      case "car":
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
  PUT: (props: PutProps) => {
    const { key, currentPath } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "confirmCarReturn":
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
