#!/bin/bash

echo "Please choose a directory by entering the corresponding number:"
echo "0 - src/components/generics"
echo "1 - src/pages/CreateScenario"

# ユーザーの選択を読み込む
read choice

echo "Enter the component name:"
read component_name

# 選択に基づいて dir_path を設定
case $choice in
  0)
    dir_path="src/components/generics/${component_name}"
    ;;
  1)
    dir_path="src/pages/CreateScenario/${component_name}"
    ;;
  *)
    echo "Invalid choice. Exiting..."
    exit 1
    ;;
esac

# ディレクトリが存在する場合はメッセージを出力して終了
if [ -d "$dir_path" ]; then
  echo "The directory $dir_path exist already."
  exit 1
fi

mkdir -p "$dir_path"

# コンポーネントとプレゼンターのファイルパス
component_file="${dir_path}/index.tsx"
presenter_file="${dir_path}/presenter.tsx"
style="${dir_path}/style.ts"

#=====================================　Containerコンポーネントの雛形を生成
echo "Creating container component: $component_file"
cat <<EOF > $component_file
import React from "react";
import ${component_name}Presenter from "./presenter";

export type Props = {
  test: string;
};

const ${component_name} = ({ test }: Props) => {
  return <${component_name}Presenter test={test} url={undefined} />;
};

export default ${component_name};
EOF

#=====================================　Presenterコンポーネントの雛形を生成
echo "Creating presenter component: $presenter_file"
cat <<EOF > $presenter_file
import React from "react";
import { View } from "react-native";
import { Props as ContainerProps } from "./index";
import styles from "./style";

type Props = {
  url: any;
} & ContainerProps;

const ${component_name}Presenter = ({ url }: Props) => {
  return <View style={styles.container}></View>;
};

export default ${component_name}Presenter;
EOF

#=====================================　stylesの雛形を生成
echo "Creating style: $style"
cat <<EOF > $style
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

export default styles;
EOF


export default styles


echo "React component and presenter have been created."