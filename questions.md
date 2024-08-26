# 📨 Customer Questions

## 1. Latency Concerns

**Customer Query**: 
*"I have two microservices—one in Digital Ocean US East (Ohio) and the other in AWS US West. I’ve set up the Neon database in us-east-1. Is latency going to be an issue for achieving peak performance given my setup?"*

**Response**:

Hi [Customer],

Latency occurs because data has to travel across the physical distance between regions for both reads and writes. In your case, with regions like us-east-1 and AWS US West, this could add a delay of about 60ms to 120ms. This delay impacts peak performance, especially for write-heavy applications.

To mitigate this:

1. **Read Replicas**: Place copies of your database closer to users. While this improves read performance, it doesn’t speed up writes, as writes still need to travel to the primary region.
  
2. **Multi-Region Setup**: This involves having databases in multiple regions that are synced in real-time. It reduces latency for both reads and writes, ensuring faster performance by handling data closer to where it's needed.

3. **Caching**: Store frequently accessed data locally, which significantly speeds up access for both reads and writes, especially for static content.

**When to Use Each**:
- **Read Replicas**: Best when read performance needs boosting, but keep in mind writes will still be slower.
- **Multi-Region**: Ideal when you need to optimize both reads and writes across different regions, reducing overall latency.
- **Caching**: Perfect for static or frequently accessed data, helping to reduce the load on your primary database.

Let me know which option you’d like to explore further, and I’m happy to assist!

Best,  
Steven McConnon
Solutions Engineer, Neon



---




## 2. Logical Replication Setup

**a. What is Logical Replication?**

**Response**:


Logical replication in PostgreSQL allows you to replicate specific data changes, such as INSERTs, UPDATEs, and DELETEs, from one database to another. Unlike physical replication, which replicates entire data blocks, logical replication offers fine-grained control over what is replicated, typically using primary keys.

Logical replication uses a **publish-subscribe (pub-sub) model**:
- **Publisher**: The database that creates publications, which are essentially sets of changes (like specific tables).
- **Subscriber**: The database that subscribes to these publications, pulling in the changes from the publisher.

**Types of Logical Replication**:

1. **Outbound Logical Replication**:
   - **Description**: Sends specific changes from a source database to one or more target databases.
   - **Example**: A company might use outbound logical replication to sync only `sales` and `inventory` tables from the primary database to a reporting database. This keeps reports current without overloading the main database with additional read traffic.

2. **Inbound Logical Replication**:
   - **Description**: Aggregates changes from multiple source databases into a central target database.
   - **Example**: A retail chain might use inbound logical replication to consolidate sales data from multiple stores into a central database, enabling streamlined reporting and centralized analysis.

3. **Bidirectional Logical Replication**:
   - **Description**: Replicates changes in both directions between databases, keeping them synchronized.
   - **Example**: A financial institution might use bidirectional replication to keep two geographically separate databases synchronized. This setup ensures high availability and redundancy, allowing either database to handle transactions if the other goes down.

Logical replication is particularly useful for scenarios where you need to replicate specific tables or rows, synchronize data across different PostgreSQL versions, or maintain data consistency across multiple regions or systems.




**b. When to Recommend Outbound Logical Replication?**



**Response**:

Outbound logical replication is recommended when:

1. **Selective Data Synchronization**: You need to replicate only specific tables or data, reducing unnecessary data transfer and ensuring targeted updates.

2. **Reducing Load on the Primary Database**: It offloads read-heavy operations to secondary databases, helping maintain optimal performance on the primary database.

3. **Real-Time Data Integration**: Ensures immediate updates across distributed systems, making it ideal for real-time analytics or distributed applications.

4. **Data Migration and Upgrades**: Keeps the old and new databases in sync during migration, ensuring the new system is up-to-date when you switch over, minimizing downtime and preventing data loss or inconsistencies.

Outbound logical replication is best used when you need control over what data is replicated and want to optimize performance, efficiency, and data integrity across multiple environments.





**c. Setting Up Outbound Logical Replication from Neon**

**Customer Query**: 
*"How do I set up outbound logical replication from Neon to [chosen PostgreSQL service]?"*

**Response**:

For a detailed guide on setting up outbound logical replication from Neon to another PostgreSQL service, please refer to the [Neon documentation](https://neon.tech/blog/stream-data-from-neon-to-external-data-sources-via-logical-replication). 

This resource provides step-by-step instructions to ensure your setup is smooth and effective. 

If you need any further guidance or run into any issues, feel free to reach out—I'm here to help!

Best,  
Steven McConnon
Solutions Engineer, Neon


## Part D: Technical Implementation

**Customer Query**:  
*"Using a Postgres service of your preference, prepare a setup with outbound logical replication in effect from Neon to <choose-postgres-service-of-your-preference>. Using the external Postgres service as the source, fetch and display the records of the actively replicating table in your Node.js application."*

**Response**:  
To see the detailed steps and approach taken for this setup, please refer to the [Technical Implementation Details](technical.md).

