from sqlalchemy import create_engine, engine, text
from sqlalchemy.orm import sessionmaker, session


class DataLink:

    def __init__(self,
                 username,
                 password,
                 database,
                 host='localhost',
                 adapter="postgresql",
                 poolSize=20,
                 port=5432,
                 overflow=5,
                 commit=False,
                 flush=False,
                 ) -> None:
        self.url = engine.URL.create(
            adapter,
            username=username,
            password=password,
            host=host,
            port=port,
            database=database,
        )
        
        self.engine = create_engine(
            self.url,
            pool_size=poolSize, max_overflow=overflow
        )

        self.session = sessionmaker(
            autocommit=commit, autoflush=flush, bind=self.engine)

    def session(self) -> session.Session:
        db = self.session()
        
        try:
            yield db
        except Exception as e:
            raise RuntimeError('Error getting session, see details: ', str(e))
        finally:
            db.close()

    def raw(self):
        return self.engine.connect()
    
    def executeRaw(self, query):
        self.raw().execute(text(query))