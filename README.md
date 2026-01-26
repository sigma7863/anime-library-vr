# Anime Library VR - 学校図書室シミュレーター

ブラウザ上で学校の図書室をアニメ風3D空間として再現するVR体験プロジェクト。

## 🎯 プロジェクト概要

- **FPS（一人称）視点**で自由に歩き回れる
- 本棚から本を取り出し、**実際に本を開いて読める**
- 現実の図書室に近い体験（移動、座る、検索）をアニメ調で提供
- 日本の古典文学をテーマにした書籍コレクション

## 🛠 技術スタック

- **Next.js** (App Router)
- **React Three Fiber** + **Three.js**
- **TypeScript**
- **Tailwind CSS**
- **pnpm** (パッケージマネージャー)

## 🚀 Getting Started

### インストール

```bash
# 依存関係をインストール
pnpm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動
pnpm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 🎮 操作方法

### 基本操作
- **WASD / 矢印キー**: 移動
- **Shift**: 走る
- **マウス**: 視点操作
- **クリック**: 本を開く・インタラクション

### UI機能
- **🔍 検索ボタン**: 右上の虫眼鏡アイコンで書籍検索パネルを開く
- **📖 本の読書**: 本をクリックすると読書モーダルが開く
- **📚 カテゴリ検索**: 神話、古典文学、随筆などで絞り込み

## 📁 プロジェクト構造

```
src/
├── components/
│   ├── Experience.tsx      # 3Dシーンのメインコンポーネント
│   ├── LibraryRoom.tsx    # 図書室の3Dモデル
│   ├── Bookshelf.tsx      # 本棚コンポーネント
│   ├── Book.tsx          # 本コンポーネント
│   ├── BookReader.tsx    # 本を読むモーダル
│   ├── SearchPanel.tsx   # 検索パネル
│   ├── Chair.tsx         # 椅子コンポーネント
│   └── Player.tsx        # プレイヤー操作
├── app/
│   └── page.tsx          # メインページ
└── ...
```

## 🎨 特徴

### 3D図書室
- アニメ風のデザイン
- リアルな照明と影
- インタラクティブな家具配置

### 書籍コレクション
- 日本の古典文学（源氏物語、枕草子など）
- カテゴリ別整理
- ホバー効果とツールチップ

### 読書体験
- ページめくり機能
- 読みやすい日本語テキスト表示
- リアルな本のUIデザイン

## 🔧 カスタマイズ

### 新しい本を追加する

`Bookshelf.tsx` の `books` 配列に新しい本を追加：

```typescript
const books = [
  // 既存の本...
  { 
    id: 'new-book', 
    title: '新しい本のタイトル', 
    color: '#FF6B6B', 
    author: '著者名' 
  }
]
```

### 本の内容を編集する

`BookReader.tsx` の `defaultContent` を編集して、本の内容をカスタマイズできます。

## 📦 デプロイ

### Vercelでデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/anime-library-vr)

### 手動デプロイ

```bash
# ビルド
pnpm run build

# スタート
pnpm start
```

## 🤝 貢献

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. コミット (`git commit -m 'Add some AmazingFeature'`)
4. プッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。

## 🙏 謝辞

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - ReactのためのThree.jsレンダラー
- [Three.js](https://threejs.org/) - 3Dグラフィックスライブラリ
- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
