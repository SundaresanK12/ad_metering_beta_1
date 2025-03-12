
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, KeyRound, Save } from 'lucide-react';
import { toast } from 'sonner';

interface MongoDbFormProps {
  onConnectionSuccess: (connectionString: string, database: string, collection: string) => void;
  onSaveToDb: () => void;
  isConnected: boolean;
  isSaving: boolean;
  hasExtractedData: boolean;
}

const MongoDbForm: React.FC<MongoDbFormProps> = ({
  onConnectionSuccess,
  onSaveToDb,
  isConnected,
  isSaving,
  hasExtractedData
}) => {
  const [connectionTab, setConnectionTab] = useState<string>("standard");
  const [connectionString, setConnectionString] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [port, setPort] = useState<string>("27017");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authDb, setAuthDb] = useState<string>("admin");
  const [database, setDatabase] = useState<string>("");
  const [collection, setCollection] = useState<string>("pdf_data");

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalConnectionString: string;
    
    if (connectionTab === "standard") {
      if (!connectionString) {
        toast.error("Connection string is required");
        return;
      }
      finalConnectionString = connectionString;
    } else {
      if (!host || !database) {
        toast.error("Host and database name are required");
        return;
      }
      
      const authPart = username && password 
        ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@` 
        : '';
      
      const authDbPart = username && password 
        ? `?authSource=${authDb}` 
        : '';
      
      finalConnectionString = `mongodb://${authPart}${host}:${port}/${authDbPart}`;
    }
    
    if (!database) {
      toast.error("Database name is required");
      return;
    }
    
    if (!collection) {
      toast.error("Collection name is required");
      return;
    }
    
    onConnectionSuccess(finalConnectionString, database, collection);
  };

  return (
    <Card className="p-4 backdrop-blur-sm bg-white/5 border border-border/50 animate-fade-in">
      <Tabs defaultValue="standard" value={connectionTab} onValueChange={setConnectionTab}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium flex items-center">
            <Database className="h-4 w-4 mr-1" />
            MongoDB Connection
          </h3>
          <TabsList className="grid grid-cols-2 h-7">
            <TabsTrigger value="standard" className="text-xs px-2">Connection String</TabsTrigger>
            <TabsTrigger value="custom" className="text-xs px-2">Custom Setup</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="standard" className="mt-2 animate-fade-in">
          <form onSubmit={handleConnect} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="connection-string" className="text-xs">Connection String</Label>
              <Input
                id="connection-string"
                placeholder="mongodb://username:password@host:port"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                disabled={isConnected}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="database-name" className="text-xs">Database Name</Label>
                <Input
                  id="database-name"
                  placeholder="pdf_database"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                  disabled={isConnected}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="collection-name" className="text-xs">Collection Name</Label>
                <Input
                  id="collection-name"
                  placeholder="pdf_data"
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  disabled={isConnected}
                />
              </div>
            </div>
            <div className="flex justify-center pt-1">
              {isConnected ? (
                <Button
                  type="button"
                  onClick={onSaveToDb}
                  className="w-full"
                  disabled={isSaving || !hasExtractedData}
                >
                  <Save className="h-4 w-4 mr-1" />
                  {isSaving ? "Saving..." : "Save to MongoDB"}
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  <KeyRound className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </form>
        </TabsContent>

        <TabsContent value="custom" className="mt-2 animate-fade-in">
          <form onSubmit={handleConnect} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="host" className="text-xs">Host</Label>
                <Input
                  id="host"
                  placeholder="localhost"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  disabled={isConnected}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="port" className="text-xs">Port</Label>
                <Input
                  id="port"
                  placeholder="27017"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  disabled={isConnected}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-xs">Username (optional)</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isConnected}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs">Password (optional)</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isConnected}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="auth-db" className="text-xs">Auth DB</Label>
                <Input
                  id="auth-db"
                  placeholder="admin"
                  value={authDb}
                  onChange={(e) => setAuthDb(e.target.value)}
                  disabled={isConnected}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="custom-database" className="text-xs">Database Name</Label>
                <Input
                  id="custom-database"
                  placeholder="pdf_database"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                  disabled={isConnected}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="custom-collection" className="text-xs">Collection</Label>
                <Input
                  id="custom-collection"
                  placeholder="pdf_data"
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  disabled={isConnected}
                />
              </div>
            </div>
            <div className="flex justify-center pt-1">
              {isConnected ? (
                <Button
                  type="button"
                  onClick={onSaveToDb}
                  className="w-full"
                  disabled={isSaving || !hasExtractedData}
                >
                  <Save className="h-4 w-4 mr-1" />
                  {isSaving ? "Saving..." : "Save to MongoDB"}
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  <KeyRound className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MongoDbForm;
