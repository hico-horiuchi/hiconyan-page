---
description: ポートフォリオの YAML ファイルを編集する際に参照する固有名詞の用語集
paths:
  - "src/yaml/*.yaml"
---

# 用語集

ポートフォリオの YAML ファイルを編集する際に参照する固有名詞の一覧。

## SDPF (Smart Data Platform)

NTT ドコモビジネス (NTT DOCOMO BUSINESS, Inc.) が開発・提供するパブリッククラウドサービス。

| 用語 | 略称 | 概要 | 公式サイト |
|---|---|---|---|
| ファイアウォール | vSRX, vFW | SDPF のサービスメニューの一つ。セルフマネージドなファイアウォールを提供。Juniper vSRX を採用 | https://sdpf.ntt.com/services/firewall/ |
| ロードバランサー | vThunder ADC, vThunder, vLB | SDPF のサービスメニューの一つ。セルフマネージドなロードバランサーを提供。A10 vThunder を採用 | https://sdpf.ntt.com/services/loadbalancer-vthunder/ |
| Managed Load Balancer | Managed LB, mLB | SDPF のサービスメニューの一つ。フルマネージドなロードバランサーを提供 | https://sdpf.ntt.com/services/managed-lb/ |

## Qmonus

NTT ドコモビジネス (NTT DOCOMO BUSINESS, Inc.) が開発・提供する社内製プロダクト群。

| 用語 | 略称 | 概要 | 公式サイト |
|---|---|---|---|
| Qmonus SDK | - | Python ベースのアプリケーションフレームワーク。REST API・マイクロサービス開発用途 | https://docs.sdk.qmonus.net/ |
| Qmonus Value Stream | Qmonus VS | DevOps プラットフォーム。ビルド・テスト・デプロイなどのリリースプロセスを自動化 | https://docs.valuestream.qmonus.net/ |

### YAML 上の表現との対応

- 「社内製のアプリケーションフレームワーク」/ "in-house application framework" → Qmonus SDK
- 「CI / CD ツール」/ "CI / CD tools" → Qmonus Value Stream
