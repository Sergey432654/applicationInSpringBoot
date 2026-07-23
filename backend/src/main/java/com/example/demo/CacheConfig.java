package com.example.demo;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJacksonJsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

import tools.jackson.databind.ObjectMapper;

import java.time.Duration;
@Configuration
@EnableCaching
public class CacheConfig {
    

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        GenericJacksonJsonRedisSerializer jsonSerializer = new GenericJacksonJsonRedisSerializer(new ObjectMapper());
        RedisSerializationContext.SerializationPair<Object> valuePair = RedisSerializationContext.SerializationPair.fromSerializer(jsonSerializer);

         RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(20))
                .serializeValuesWith(valuePair);
        return RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
    }
}
