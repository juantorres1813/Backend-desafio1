import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080,
        SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
    },
    DATABASES: {
        filesystem: {
            PRODUCTS_FILENAME,
            CARTS_FILENAME,
        },
        mongo: {
            url: process.env.MONGO_DB_URL,
            dbName: process.env.MONGO_DB_NAME,
        },
        firebase: {
            "type": "service_account",
            "project_id": "ecommerce-backend-coder-c01d3",
            "private_key_id": "47bb1579e396b8b48612d37d4fa161f24330f49c",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCT8PtnGyqDJ6+B\nLMRL0rDNfEgki9sLu5dubixqgjZXRYBoAt04uDPLJAdCfdNnkfr7LF9oIQRfeGY+\nIQvwCxSRZfP04w+axPj6gJvGaQkbFtnZuLoGvcQ73MMUErOsgW1f0CPkeHUiPFr4\nXK52/RFY/ioHk/hVBzvnOLq0XyD1DKcj+Wkftwihr9LxRDTCPin/fU1TlrPyoeqh\nzxCIC31FPVaj3OjcWtnOhg5ifFvjehScvVb80v2QADWEM+e+J6LVcHPho4nrxsqF\nEnORrzYcv3xCxQT4z0Isi2JN61ilPAEa9Fehy14PDmmdlqtQeFqs859lURIhD9xY\nkzX3rYw7AgMBAAECggEAK9vEXFPUbZ+FS1FfPG9Q1QpkRNllbfwGL8nfxw+lVogX\nQj6fIOKTEEU1FcRBuTGw62fDPRaUukzyWrbnWBmg1l4YTeBGzwZYHcOk6tRWy74h\nhYdbNwZpN6oB92B3/cs9BqupCGGhsC2edoTbgBEUZIKtKSP3+hUz8B+EUlblaWAM\nhMd6OR4PzdvpFmdoVClM/Jz9Uq0h0aBb6tLny4Z222BPKXSCK+CQHljF7xuYVrv7\nsg6pe3IEf3uIcx5+neqHUtlkJY7KQ94bpoW7BYWkLLMZIX7jvbqoLTotfdFYXW2d\nK37ZEsE33SgQmfQqVJiOWnbN/Wa3mROLMRAvwatU0QKBgQDD1bPNfsuu/wHm6fTj\nKu7WxC6klBuo8PZtH+TciL93qhi2bsEJNghYCgb9ATbPNVdBkA4ha/5BsZTP8qDV\ndZ6/T3X17AFpWcOcjR/nkaGK+tKXxiGX+PpdLN8tOvPv83RNILQ/J7G9sQ/d5e63\nWMDlzHcxpR8qRn7g1ax+s0xiyQKBgQDBZHyr0HSKo4Nj1d3FGWB3I0zydb2g/oFY\nfkEUJQ51LxwAYiz+kbEgByE106xo+0qfvbBBmBxfnaUfW3ys5oCEy3kxuQlxqTyz\nL0GLSQ3Kg4Eqk4nO4+STTtSb9Cmlt2FXtAwlykX4JFYXbJgtZ9+vIOb93n2n0fyd\nemXKEkhU4wKBgAOF5a0tucZVKhiYXuJzVEai0t/9Fh5M73H5H+njv+YMNlOZ3Hko\n8q96xrNogS7rG72/NLHfOny+EBpJmCEe85Mnf8zDySa3CbDYTRmiYhCZAI7gbpxI\nS2C/vOgYZmkLrSzyCKwWL7lk5Q8t4sSDoTzBF+fZu5zMFd4/mdHRse8ZAoGBALjQ\ndSwk7BrJpHi2G1eOptd0Dsbuqie+0JFnJn4/448tVA8xw1oMlT7MUXqFLRCuhWQe\n/N/So9rkZraO0ZjSNyOw58MS1+mdF/sNQBAB4oIUJk4v7NSgiQIVpazcKyjJFOeh\nkrJSmYdIAlYkW1GZIPTV9qnKBD9qt4UvQTNZQXKNAoGBAJz7FG6RZrqWhphI4SSI\n74+fZx9NQ9yKnTKZl5uMDk3pOoNf+muxpwIVScBXMTO7E8O54z9Z/TYjODJu3+kq\n2Ymdcv51nn9T1VZBfJkMZL5Gzdp/StIfxPKFW66dgIvJQVUk3jC73BGtbG/GEqeG\nfets7VMQm1NGWbJH36h0G/x/\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-d551o@ecommerce-backend-coder-c01d3.iam.gserviceaccount.com",
            "client_id": "111678234303962103215",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d551o%40ecommerce-backend-coder-c01d3.iam.gserviceaccount.com"
        }
    },
};

export { config };