---
title: DNS Record Basics
type: cheatsheet
tags: [webdev,dns,server,cheatsheet]
author: chalarangelo
cover: sparkles
excerpt: DNS records may not be a thing you work too often with. Regardless, some basic knowledge can go a long way.
dateModified: 2022-01-09T05:00:00-04:00
---

Most web developers go about their day-to-day without having to deal with DNS records most of the time. Regardless, knowing what DNS stands for and the types of DNS records are pretty useful.

### DNS Definition

The Domain Name System (abbreviated to DNS), translates human-readable domain names (e.g www.google.com to machine-readable IP addresses (e.g. 142.250.186.46).

### DNS Records

A DNS is made up of multiple records of different types, each one with its own purpose. Here's a breakdown of the most commonly-used ones:

- **A record**: The address record. Used to map a domain name to an IPv4 address. Similarly, the **AAAA record** is used to map a domain name to an IPv6 address.
- **CNAME records**: A canonical name record. Creates an alias that points to another domain or subdomain, but never an IP address.
- **ANAME record**: Allows you to point the root of your domain to a hostname or a domain name.
- **TXT records**: Allow the addition of limited text notes and is often used for ownership verification purposes, validation or security.
- **MX record**: Specifies the mail server responsible for accepting the incoming and outgoing emails for a domain. Should point to a mail server name, not an IP address.
