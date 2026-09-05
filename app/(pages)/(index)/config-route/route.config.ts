export type GetProps =
  | {
      key: "dashboardCar";
      pageParam: number;
      limit: number;
    }
  // | {
  //     key: "statistics";
  //     currentPath: string;
  //   }
  | {
      key: "carFilterBrand";
      brand: string;
      pageParam: number;
      limit: number;
    };
// | {
//     key: "carFilterModel";
//     currentPath: string;
//     model: string;
//     pageParam: number;
//     limit: number;
//   }
// | {
//     key: "carFilterBrandAndModel";
//     currentPath: string;
//     brand: string;
//     model: string;
//     pageParam: number;
//     limit: number;
//   }
// | {
//     key: "car";
//     currentPath: string;
//     pageParam: number;
//     limit: number;
//   };

export type PostProps = {
  key: "postRentCar";
};

export const ROUTES_DASHBOARD = {
  GET: (props: GetProps) => {
    const { key } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "dashboardCar":
        params.set("page-param", String(props.pageParam));
        params.set("limit", String(props.limit));
        break;
      case "carFilterBrand":
        params.set("brand", String(props.brand));
        params.set("page-param", String(props.pageParam));
        params.set("limit", String(props.limit));
        break;

      default:
        return "";
    }

    return `/api?${params.toString()}`;
  },
  POST: (props: PostProps) => {
    const { key } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "postRentCar":
        break;
      default:
        return "";
    }

    return `/api/action?${params.toString()}`;
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
