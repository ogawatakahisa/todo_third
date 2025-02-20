import { CognitoJwtVerifier } from "aws-jwt-verify";
import { Request, Response, NextFunction } from "express";
import awsmobile from "../config/aws-exports.js";

/**
 * Cognito JWT トークンの検証設定
 * - Cognito ユーザープールの設定を使用してトークンを検証
 */
const verifier = CognitoJwtVerifier.create({
    userPoolId: awsmobile.aws_user_pools_id, // ユーザープール ID（Cognito の設定から取得）
    tokenUse: "access", // 検証対象のトークンの種類（access token）
    clientId: awsmobile.aws_user_pools_web_client_id, // クライアント ID（Cognito のアプリクライアント）
});

/**
 * 認証ミドルウェア
 * - リクエストヘッダーの `Authorization` から JWT トークンを取得し、Cognito で検証
 * - 検証が成功すれば `req.body.user` にユーザー情報を格納し、次の処理へ
 * - 認証エラーが発生した場合、401 ステータスコードを返す
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("認証ミドルウェア実行: リクエストヘッダー:", req.headers);

        // Authorization ヘッダーの取得
        const authHeader = req.headers.authorization;
        console.log("Received Authorization header:", authHeader);

        // トークンの有無とフォーマットをチェック
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.error("認証エラー: Authorization ヘッダーがない or フォーマットが不正");
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }

        // Bearer トークン部分のみを抽出
        const token = authHeader.split(" ")[1];
        console.log("受け取ったトークン:", token);

        // トークンの検証
        const payload = await verifier.verify(token);
        console.log("認証成功: ユーザー情報:", payload);

        req.body.user = payload ;// 認証情報をリクエストボディにセット

        next();
    } catch (error) {
        console.error("認証エラー:", error);
        res.status(401).json({ error: "Invalid token" });
        return;
    }
};
